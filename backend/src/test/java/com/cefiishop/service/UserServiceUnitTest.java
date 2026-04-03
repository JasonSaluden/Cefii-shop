package com.cefiishop.service;

import com.cefiishop.dto.UserLoginRequest;
import com.cefiishop.dto.UserRegisterRequest;
import com.cefiishop.model.User;
import com.cefiishop.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserServiceUnitTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    @Test
    void register_existingEmail_throws() {
        UserRegisterRequest req = new UserRegisterRequest();
        req.setMail("a@b.com"); req.setPassword("pw");
        when(userRepository.existsByMail("a@b.com")).thenReturn(true);

        assertThrows(IllegalArgumentException.class, () -> userService.register(req));
    }

    @Test
    void register_success_returnsMapped() {
        UserRegisterRequest req = new UserRegisterRequest();
        req.setMail("new@b.com"); req.setPassword("pw");
        when(userRepository.existsByMail("new@b.com")).thenReturn(false);
        when(passwordEncoder.encode("pw")).thenReturn("encoded");

        User saved = new User(); saved.setId(12); saved.setMail("new@b.com"); saved.setCreatedAt(LocalDateTime.now());
        when(userRepository.save(any())).thenReturn(saved);

        var resp = userService.register(req);
        assertEquals(12, resp.getId());
        assertEquals("new@b.com", resp.getMail());
    }

    @Test
    void login_wrongPassword_throws() {
        UserLoginRequest req = new UserLoginRequest(); req.setMail("x@b"); req.setPassword("p");
        User u = new User(); u.setPassword("enc");
        when(userRepository.findByMail("x@b")).thenReturn(Optional.of(u));
        when(passwordEncoder.matches("p", "enc")).thenReturn(false);

        assertThrows(IllegalArgumentException.class, () -> userService.login(req));
    }

    @Test
    void login_success_returnsMapped() {
        UserLoginRequest req = new UserLoginRequest(); req.setMail("x@b"); req.setPassword("p");
        User u = new User(); u.setId(2); u.setMail("x@b"); u.setPassword("enc"); u.setRole(User.UserRole.CLIENT);
        when(userRepository.findByMail("x@b")).thenReturn(Optional.of(u));
        when(passwordEncoder.matches("p", "enc")).thenReturn(true);

        var resp = userService.login(req);
        assertEquals(2, resp.getId());
        assertEquals("x@b", resp.getMail());
    }

    @Test
    void updateUser_changePassword_encodesAndSaves() {
        UserRegisterRequest req = new UserRegisterRequest(); req.setMail("m"); req.setPassword("newpw");
        User existing = new User(); existing.setId(3); existing.setMail("old"); existing.setPassword("oldenc");
        when(userRepository.findById(3)).thenReturn(Optional.of(existing));
        when(passwordEncoder.encode("newpw")).thenReturn("newenc");
        when(userRepository.save(any())).thenAnswer(i -> i.getArgument(0));

        var resp = userService.updateUser(3, req);
        assertEquals("newenc", existing.getPassword());
    }

    @Test
    void deleteUser_callsRepository() {
        doNothing().when(userRepository).deleteById(5);
        userService.deleteUser(5);
        verify(userRepository).deleteById(5);
    }

    @Test
    void getAllUsers_mapsResponses() {
        User u = new User(); u.setId(8); u.setMail("u@b"); u.setCreatedAt(LocalDateTime.now()); u.setRole(User.UserRole.CLIENT);
        when(userRepository.findAll()).thenReturn(List.of(u));
        var res = userService.getAllUsers();
        assertEquals(1, res.size());
        assertEquals(8, res.get(0).getId());
    }
}
