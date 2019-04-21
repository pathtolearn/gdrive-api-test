package com.gdrive.apitest.utilities;

import java.io.FileNotFoundException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;

public class Utilities {
	public static Resource loadFileAsResource(String fileName) throws FileNotFoundException {
		try {
			Path filePath = Paths.get("E:\\Trinadh\\samples\\gdrive-api-test\\files\\" + fileName).toAbsolutePath()
					.normalize();
			Resource resource = new UrlResource(filePath.toUri());
			if (resource.exists()) {
				return resource;
			} else {
				throw new FileNotFoundException("File not found " + fileName);
			}
		} catch (MalformedURLException ex) {
			throw new FileNotFoundException("File not found " + fileName);
		}
	}
}
