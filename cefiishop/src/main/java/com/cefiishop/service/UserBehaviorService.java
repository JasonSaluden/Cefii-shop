package com.cefiishop.service;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import com.cefiishop.model.UserBehavior;
import com.cefiishop.repository.UserBehaviorRepository;

@Service
public class UserBehaviorService {

    private final UserBehaviorRepository userBehaviorRepository;

    public UserBehaviorService(UserBehaviorRepository userBehaviorRepository) {
        this.userBehaviorRepository = userBehaviorRepository;
    }

    public UserBehavior addProductView(Long userId, Long productId) {
        UserBehavior behavior = userBehaviorRepository.findByUserId(userId)
                .orElseGet(() -> {
                    UserBehavior b = new UserBehavior();
                    b.setUserId(userId);
                    return b;
                });
        UserBehavior.ProductView view = new UserBehavior.ProductView();
        view.setProductId(productId);
        behavior.getViewedProducts().add(view);
        return userBehaviorRepository.save(behavior);
    }

    public UserBehavior getByUserId(Long userId) {
        return userBehaviorRepository.findByUserId(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Aucun comportement trouve pour l utilisateur : " + userId));
    }
}
