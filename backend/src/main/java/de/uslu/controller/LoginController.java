package de.uslu.controller;

import de.uslu.user.JwtService;
import de.uslu.user.LoginData;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/auth/login")
@RequiredArgsConstructor
public class LoginController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;


    @PostMapping
    public String login(@RequestBody LoginData loginData) {
        try {
            Authentication auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginData.getUsername(), loginData.getPassword()));

            Map<String, Object> claims = new HashMap<>();
            return jwtService.createToken(claims, loginData.getUsername());
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "invalid credentials");
        }
    }

    private List<String> getRoles(Authentication auth) {
        return auth.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

    }
}
