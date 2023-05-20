package com.example.server.configuration;

import com.example.server.interceptor.CorsInterceptor;
import com.example.server.interceptor.SaTokenInterceptor;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@AllArgsConstructor
public class WebMvcConfiguration implements WebMvcConfigurer {


    private final CorsInterceptor corsInterceptor;
    private final SaTokenInterceptor saTokenInterceptor;


    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(corsInterceptor);
        registry.addInterceptor(saTokenInterceptor);
    }
}
