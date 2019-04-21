package com.gdrive.apitest.controllers;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.net.URLEncoder;
import java.util.List;
import java.util.Optional;

import javax.activation.MimetypesFileTypeMap;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.gdrive.apitest.models.Folders;
import com.gdrive.apitest.service.GDriveService;

import io.swagger.annotations.ApiParam;

@RestController
public class HomeController {

	@Autowired
	private GDriveService service;

	private ObjectMapper mapper = new ObjectMapper();

	@GetMapping("/")
	public String welcome() {
		return "Welcome";
	}

	@CrossOrigin
	@GetMapping("/folders")
	public ResponseEntity<String> getFilesAndFolders(@RequestParam String Authorization, @RequestParam String id,
			@ApiParam(required = false) @RequestParam Optional<Boolean> includeTeamDrives,
			@ApiParam(required = false) @RequestParam Optional<String> orderBy,
			@ApiParam(required = false) @RequestParam Optional<Boolean> fetchTags,
			@ApiParam(required = false) @RequestParam Optional<Boolean> calculateFolderPath,
			@ApiParam(required = false) @RequestParam Optional<Integer> pageSize,
			@ApiParam(required = false) @RequestParam Optional<String> nextPage,
			@ApiParam(required = false) @RequestParam Optional<String> fields) throws JsonProcessingException {
		ResponseEntity<String> returnEntity = null;
		try {
			List<Folders> folders = service.getFilesAndFolders(Authorization, id, includeTeamDrives, orderBy, fetchTags,
					calculateFolderPath, pageSize, nextPage, fields);
			returnEntity = new ResponseEntity<String>(mapper.writeValueAsString(folders), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<String>(mapper.writeValueAsString(e.getLocalizedMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return returnEntity;
	}

	@CrossOrigin
	@RequestMapping(value = "/upload/files", method = RequestMethod.POST, produces = "application/json", consumes = {
			"multipart/form-data" })
	public ResponseEntity<String> uploadFilesToAFolder(@RequestPart String Authorization,
			@RequestPart MultipartFile file, @ApiParam(required = false) @RequestPart MultipartFile thumbnail, @RequestPart String path,
			@ApiParam(required = false) @RequestParam Optional<String> folderId,
			@ApiParam(required = false) @RequestPart Optional<String> mimeType,
			@ApiParam(required = false) @RequestPart Optional<Integer> size,
			@ApiParam(required = false) @RequestPart Optional<String[]> tags,
			@ApiParam(required = false) @RequestPart Optional<String> description,
			@ApiParam(required = false) @RequestPart Optional<Boolean> overwrite,
			@ApiParam(required = false) @RequestPart Optional<Boolean> calculateFolderPath) throws JsonProcessingException {
		ResponseEntity<String> returnEntity = null;
		try {
			Folders folder = service.uploadFilesToAFolder(Authorization, file, thumbnail, path, folderId, mimeType, size, tags, description,
					overwrite, calculateFolderPath);
			returnEntity = new ResponseEntity<String>(mapper.writeValueAsString(folder), HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<String>(mapper.writeValueAsString(e.getLocalizedMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
		}

		return returnEntity;
	}

	@CrossOrigin
	@GetMapping("/file/id")
	public ResponseEntity<Resource> downloadFile(@RequestParam String Authorization, @RequestParam String id,
			@ApiParam(required = false) @RequestParam Optional<Boolean> calculateFolderPath,
			@ApiParam(required = false) @RequestParam Optional<Boolean> includeTeamDrives, HttpServletResponse response) {
		try {
			String downloadedFilePath = service.downloadFile(Authorization, id, calculateFolderPath, includeTeamDrives);
			File file = new File(downloadedFilePath);

			response.setContentType(new MimetypesFileTypeMap().getContentType(file));
			response.setContentLength((int)file.length());
			response.setHeader("Content-Disposition", "attachment; filename=" + URLEncoder.encode(file.getName(), "UTF-8"));

			InputStream is = new FileInputStream(file);
			FileCopyUtils.copy(is, response.getOutputStream());

		} catch (Exception e) {
			System.out.println(e.getStackTrace());
		}
		return null;
	}

	@CrossOrigin
	@GetMapping("/folder/contents")
	public ResponseEntity<String> getFolderContents(@RequestParam String Authorization, @RequestParam String path,
			@ApiParam(required = false) @RequestParam Optional<Boolean> includeTeamDrives,
			@ApiParam(required = false) @RequestParam Optional<String> teamDriveId,
			@ApiParam(required = false) @RequestParam Optional<String> where,
			@ApiParam(required = false) @RequestParam Optional<String> orderBy,
			@ApiParam(required = false) @RequestParam Optional<Boolean> fetchTags,
			@ApiParam(required = false) @RequestParam Optional<Boolean> calculateFolderPath,
			@ApiParam(required = false) @RequestParam Optional<Integer> pageSize,
			@ApiParam(required = false) @RequestParam Optional<String> nextPage,
			@ApiParam(required = false) @RequestParam Optional<String> fields) throws JsonProcessingException {

		ResponseEntity<String> returnEntity = null;
		try {
			List<Folders> folders = service.getFolderContents(Authorization, path, includeTeamDrives, teamDriveId,
					where, orderBy, fetchTags, calculateFolderPath, pageSize, nextPage, fields);
			returnEntity = new ResponseEntity<String>(mapper.writeValueAsString(folders), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<String>(mapper.writeValueAsString(e.getLocalizedMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return returnEntity;
	}
}
