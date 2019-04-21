package com.gdrive.apitest.serviceImpl;

import java.io.FileOutputStream;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.apache.http.HttpEntity;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.ResponseHandler;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.client.methods.RequestBuilder;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.mime.HttpMultipartMode;
import org.apache.http.entity.mime.MultipartEntityBuilder;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.gdrive.apitest.models.Folders;
import com.gdrive.apitest.service.GDriveService;
import com.gdrive.apitest.utilities.Constants;
import com.gdrive.apitest.utilities.ParameterStringBuilder;

@Service
public class GDriveServiceImpl implements GDriveService {

	private ObjectMapper mapper = new ObjectMapper();

	@Override
	public List<Folders> getFilesAndFolders(String authorization, String id, Optional<Boolean> includeTeamDrives,
			Optional<String> orderBy, Optional<Boolean> fetchTags, Optional<Boolean> calculateFolderPath,
			Optional<Integer> pageSize, Optional<String> nextPage, Optional<String> fields) {
		List<Folders> folders = null;
		try (CloseableHttpClient httpclient = HttpClients.createDefault()) {

			String URL = Constants.BASE_URL + Constants.FOLDERS + id + "/contents?";

			Map<String, String> parameters = new HashMap<>();
			if (includeTeamDrives.isPresent())
				parameters.put("includeTeamDrives", String.valueOf(includeTeamDrives.get()));
			if (orderBy.isPresent())
				parameters.put("orderBy", orderBy.get());
			if (fetchTags.isPresent())
				parameters.put("fetchTags", String.valueOf(fetchTags.get()));
			if (calculateFolderPath.isPresent())
				parameters.put("calculateFolderPath", String.valueOf(calculateFolderPath.get()));
			if (pageSize.isPresent())
				parameters.put("pageSize", String.valueOf(pageSize));
			if (nextPage.isPresent())
				parameters.put("nextPage", nextPage.get());
			if (fields.isPresent())
				parameters.put("fields", fields.get());

			URL += ParameterStringBuilder.getParamsString(parameters);

			HttpUriRequest request = new HttpGet(URL);

			request.addHeader("Authorization", authorization);

			// Create a custom response handler
			ResponseHandler<String> responseHandler = response -> {
				int status = response.getStatusLine().getStatusCode();
				if (status >= 200 && status < 300) {
					HttpEntity entity = response.getEntity();
					return entity != null ? EntityUtils.toString(entity) : null;
				} else {
					throw new ClientProtocolException("Unexpected response status: " + status);
				}
			};
			String responseBody = httpclient.execute(request, responseHandler);

			folders = mapper.readValue(responseBody, new TypeReference<List<Folders>>() {
			});
		} catch (Exception e) {
			throw new RuntimeException(e);
		}

		return folders;
	}

	@Override
	public Folders uploadFilesToAFolder(String authorization, MultipartFile file, MultipartFile thumbnail, String path,
			Optional<String> folderId, Optional<String> mimeType, Optional<Integer> size, Optional<String[]> tags,
			Optional<String> description, Optional<Boolean> overwrite, Optional<Boolean> calculateFolderPath) {
		Folders folder = null;
		try (CloseableHttpClient httpclient = HttpClients.createDefault()) {

			String URL = Constants.BASE_URL + Constants.FILES + "?";

			// build multipart upload request
			MultipartEntityBuilder builder = MultipartEntityBuilder.create();
			HttpEntity data = builder.setMode(HttpMultipartMode.BROWSER_COMPATIBLE)
					.addBinaryBody("file", file.getBytes(), ContentType.DEFAULT_BINARY, file.getName())
					.addTextBody("text", "", ContentType.DEFAULT_BINARY).build();

			if (thumbnail != null)
				builder.addBinaryBody("thumbnail", thumbnail.getBytes());

			Map<String, String> parameters = new HashMap<>();
			parameters.put("path", path);
			if (folderId.isPresent())
				parameters.put("path", folderId.get());
			if (mimeType.isPresent())
				parameters.put("mimeType", mimeType.get());
			if (size.isPresent())
				parameters.put("size", String.valueOf(size.get()));
			if (tags.isPresent())
				parameters.put("tags", Arrays.toString(tags.get()));
			if (description.isPresent())
				parameters.put("description", description.get());
			if (overwrite.isPresent())
				parameters.put("overwrite", String.valueOf(overwrite.get()));
			if (calculateFolderPath.isPresent())
				parameters.put("calculateFolderPath", String.valueOf(calculateFolderPath.get()));

			URL += ParameterStringBuilder.getParamsString(parameters);

			HttpUriRequest request = RequestBuilder.post(URL).setEntity(data).build();

			request.addHeader("Authorization", authorization);

			// Create a custom response handler
			ResponseHandler<String> responseHandler = response -> {
				int status = response.getStatusLine().getStatusCode();
				if (status >= 200 && status < 300) {
					HttpEntity entity = response.getEntity();
					return entity != null ? EntityUtils.toString(entity) : null;
				} else {
					throw new ClientProtocolException("Unexpected response status: " + status);
				}
			};
			String responseBody = httpclient.execute(request, responseHandler);

			folder = mapper.readValue(responseBody, new TypeReference<Folders>() {
			});

		} catch (Exception e) {
			throw new RuntimeException(e);
		}

		return folder;
	}

	@Override
	public String downloadFile(String authorization, String id, Optional<Boolean> calculateFolderPath,
			Optional<Boolean> includeTeamDrives) {
		String downloadedFilePath = null;
		try (CloseableHttpClient httpclient = HttpClients.createDefault()) {
			String URL = Constants.BASE_URL + Constants.FILES + "/" + id;

			Map<String, String> parameters = new HashMap<>();
			if (calculateFolderPath.isPresent())
				parameters.put("calculateFolderPath", String.valueOf(calculateFolderPath.get()));
			if (includeTeamDrives.isPresent())
				parameters.put("includeTeamDrives", String.valueOf(includeTeamDrives.get()));

			URL += ParameterStringBuilder.getParamsString(parameters);

			HttpUriRequest request = new HttpGet(URL);

			request.addHeader("Authorization", authorization);

			// Create a custom response handler
			ResponseHandler<String> responseHandler = response -> {
				int status = response.getStatusLine().getStatusCode();
				if (status >= 200 && status < 300) {
					HttpEntity entity = response.getEntity();
					String localFileName = null;
					if (entity != null) {
						String name = response.getFirstHeader("Content-Disposition").getValue();
						int index = name.indexOf("=");
						String fileName = name.substring(index + 1, name.length());
						localFileName = Constants.SAVE_FILES_DIR + fileName;
						FileOutputStream fos = new FileOutputStream(localFileName);
						entity.writeTo(fos);
						fos.close();
					}
					return entity != null ? localFileName : null;
				} else {
					throw new ClientProtocolException("Unexpected response status: " + status);
				}
			};
			downloadedFilePath = httpclient.execute(request, responseHandler);

		} catch (Exception e) {
			throw new RuntimeException(e);
		}
		return downloadedFilePath;
	}

	@Override
	public List<Folders> getFolderContents(String authorization, String path, Optional<Boolean> includeTeamDrives,
			Optional<String> teamDriveId, Optional<String> where, Optional<String> orderBy, Optional<Boolean> fetchTags,
			Optional<Boolean> calculateFolderPath, Optional<Integer> pageSize, Optional<String> nextPage,
			Optional<String> fields) {
		List<Folders> folders = null;
		try (CloseableHttpClient httpclient = HttpClients.createDefault()) {
			String URL = Constants.BASE_URL + Constants.FOLDERS + "/contents?";

			Map<String, String> parameters = new HashMap<>();
			parameters.put("path", path);
			if (includeTeamDrives.isPresent())
				parameters.put("includeTeamDrives", String.valueOf(includeTeamDrives.get()));
			if (teamDriveId.isPresent())
				parameters.put("teamDriveId", teamDriveId.get());
			if (where.isPresent())
				parameters.put("where", where.get());
			if (orderBy.isPresent())
				parameters.put("orderBy", orderBy.get());
			if (fetchTags.isPresent())
				parameters.put("fetchTags", String.valueOf(fetchTags.get()));
			if (calculateFolderPath.isPresent())
				parameters.put("calculateFolderPath", String.valueOf(calculateFolderPath.get()));
			if (pageSize.isPresent())
				parameters.put("pageSize", String.valueOf(pageSize.get()));
			if (nextPage.isPresent())
				parameters.put("nextPage", nextPage.get());
			if (fields.isPresent())
				parameters.put("fields", fields.get());

			URL += ParameterStringBuilder.getParamsString(parameters);

			HttpUriRequest request = new HttpGet(URL);

			request.addHeader("Authorization", authorization);

			// Create a custom response handler
			ResponseHandler<String> responseHandler = response -> {
				int status = response.getStatusLine().getStatusCode();
				if (status >= 200 && status < 300) {
					HttpEntity entity = response.getEntity();
					return entity != null ? EntityUtils.toString(entity) : null;
				} else {
					throw new ClientProtocolException("Unexpected response status: " + status);
				}
			};
			String responseBody = httpclient.execute(request, responseHandler);
			folders = mapper.readValue(responseBody.toString(), new TypeReference<List<Folders>>() {
			});
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
		return folders;
	}
}
