package com.gdrive.apitest.service;

import java.util.List;
import java.util.Optional;

import org.springframework.web.multipart.MultipartFile;

import com.gdrive.apitest.models.Folders;

public interface GDriveService {

	/**
	 * @param authorization
	 * @param id
	 * @param includeTeamDrives
	 * @param orderBy
	 * @param fetchTags
	 * @param calculateFolderPath
	 * @param pageSize
	 * @param nextPage
	 * @param fields
	 * @return
	 */
	List<Folders> getFilesAndFolders(String authorization, String id, Optional<Boolean> includeTeamDrives,
			Optional<String> orderBy, Optional<Boolean> fetchTags, Optional<Boolean> calculateFolderPath,
			Optional<Integer> pageSize, Optional<String> nextPage, Optional<String> fields);

	/**
	 * @param authorization
	 * @param file
	 * @param thumbnail
	 * @param path
	 * @param folderId
	 * @param mimeType
	 * @param size
	 * @param tags
	 * @param description
	 * @param overwrite
	 * @param calculateFolderPath
	 * @return
	 */
	Folders uploadFilesToAFolder(String authorization, MultipartFile file, MultipartFile thumbnail, String path, Optional<String> folderId, Optional<String> mimeType, Optional<Integer> size, Optional<String[]> tags, Optional<String> description, Optional<Boolean> overwrite, Optional<Boolean> calculateFolderPath);

	/**
	 * @param includeTeamDrives 
	 * @param calculateFolderPath 
	 * @param id 
	 * @param authorization 
	 * @return
	 */
	String downloadFile(String authorization, String id, Optional<Boolean> calculateFolderPath, Optional<Boolean> includeTeamDrives);


	/**
	 * @param authorization
	 * @param path
	 * @param includeTeamDrives
	 * @param teamDriveId
	 * @param where
	 * @param orderBy
	 * @param fetchTags
	 * @param calculateFolderPath
	 * @param pageSize
	 * @param nextPage
	 * @param fields
	 * @return
	 */
	List<Folders> getFolderContents(String authorization, String path, Optional<Boolean> includeTeamDrives,
			Optional<String> teamDriveId, Optional<String> where, Optional<String> orderBy, Optional<Boolean> fetchTags,
			Optional<Boolean> calculateFolderPath, Optional<Integer> pageSize, Optional<String> nextPage,
			Optional<String> fields);
}
