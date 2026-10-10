package br.com.criandoapi.projeto.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Desativa o bloqueio automático a POST, PUT e DELETE
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll() // Permite acesso livre a todas as rotas sem exigir credenciais
                );

        return http.build();
    }
}