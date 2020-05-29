package com.example.classroombackend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpRequest;
import org.springframework.http.client.ClientHttpRequestExecution;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.DefaultUriBuilderFactory;

import java.io.IOException;

@Configuration
public class AppConfig {

    @Bean
    public RestTemplate getRestTemplateForUnsplash() {
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.getInterceptors().add(new ClientHttpRequestInterceptor() {
            @Override
            public ClientHttpResponse intercept(HttpRequest httpRequest, byte[] bytes, ClientHttpRequestExecution clientHttpRequestExecution) throws IOException {
                httpRequest.getHeaders().set("Accept-Version", "v1");
                httpRequest.getHeaders().set("Authorization", "Client-ID rTL2Zuw0043YHln7jnlUZde8QKWnv4PdCdkyEjYK20Q");
                httpRequest.getHeaders().set("Set-Cookie", "SameSite=strict");//Added to remove same site cookie warning in angular console
                return clientHttpRequestExecution.execute(httpRequest, bytes);
            }
        });
        restTemplate.setUriTemplateHandler(new DefaultUriBuilderFactory("https://api.unsplash.com/"));
        return restTemplate;
    }
}
