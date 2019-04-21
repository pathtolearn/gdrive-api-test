package com.gdrive.apitest.models;

import java.sql.Date;

public class Folders {
	private String path;
	private Date createdDate;
	private int size;
	private String parentFolderId;
	private String name;
	private Date modifiedDate;
	private String id;
	private boolean directory;
	private FolderProperties properties;

	/**
	 * @return the path
	 */
	public String getPath() {
		return path;
	}

	/**
	 * @param path the path to set
	 */
	public void setPath(String path) {
		this.path = path;
	}

	/**
	 * @return the createdDate
	 */
	public Date getCreatedDate() {
		return createdDate;
	}

	/**
	 * @param createdDate the createdDate to set
	 */
	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	/**
	 * @return the size
	 */
	public int getSize() {
		return size;
	}

	/**
	 * @param size the size to set
	 */
	public void setSize(int size) {
		this.size = size;
	}

	/**
	 * @return the parentFolderId
	 */
	public String getParentFolderId() {
		return parentFolderId;
	}

	/**
	 * @param parentFolderId the parentFolderId to set
	 */
	public void setParentFolderId(String parentFolderId) {
		this.parentFolderId = parentFolderId;
	}

	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}

	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * @return the modifiedDate
	 */
	public Date getModifiedDate() {
		return modifiedDate;
	}

	/**
	 * @param modifiedDate the modifiedDate to set
	 */
	public void setModifiedDate(Date modifiedDate) {
		this.modifiedDate = modifiedDate;
	}

	/**
	 * @return the id
	 */
	public String getId() {
		return id;
	}

	/**
	 * @param id the id to set
	 */
	public void setId(String id) {
		this.id = id;
	}

	/**
	 * @return the directory
	 */
	public boolean isDirectory() {
		return directory;
	}

	/**
	 * @param directory the directory to set
	 */
	public void setDirectory(boolean directory) {
		this.directory = directory;
	}

	/**
	 * @return the properties
	 */
	public FolderProperties getProperties() {
		return properties;
	}

	/**
	 * @param properties the properties to set
	 */
	public void setProperties(FolderProperties properties) {
		this.properties = properties;
	}

}
