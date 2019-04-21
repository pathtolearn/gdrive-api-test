package com.gdrive.apitest;

import static org.junit.Assert.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MvcResult;

@RunWith(SpringRunner.class)
@SpringBootTest
@WebAppConfiguration
public class ApitestApplicationTests extends AbstractTest {

	@Override
	@Before
	public void setUp() {
		super.setUp();
	}

	@Test
	public void getFoldersById() throws Exception {
		MvcResult result = mvc
				.perform(get("/folders").param("Authorization", "")
						.param("id", "1ugsWL9O-").accept(MediaType.APPLICATION_JSON_VALUE))
				.andReturn();

		int status = result.getResponse().getStatus();
		assertEquals(200, status);
	}

	@Test
	public void getFolderContents() throws Exception {
		MvcResult result = mvc
				.perform(get("/folder/contents").param("Authorization", "")
						.param("path", "").accept(MediaType.APPLICATION_JSON_VALUE))
				.andReturn();

		int status = result.getResponse().getStatus();
		assertEquals(200, status);
	}

	@Test
	public void downloadFile() throws Exception {
		MvcResult result = mvc
				.perform(get("/file/id").param("Authorization", "")
						.param("id", "").accept(MediaType.APPLICATION_JSON_VALUE))
				.andReturn();

		int status = result.getResponse().getStatus();
		assertEquals(200, status);

	}
}
