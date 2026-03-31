package com.cefiishop.service;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.cefiishop.model.UserBehavior;
import com.cefiishop.model.UserBehavior.ProductView;
import com.cefiishop.repository.UserBehaviorRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserBehaviorService {

    private final UserBehaviorRepository userBehaviorRepository;

    public UserBehavior addProductView(Long userId, Long productId) {
        UserBehavior behavior = userBehaviorRepository.findByUserId(userId)
                .orElseGet(() -> {
                    UserBehavior b = new UserBehavior();
                    b.setUserId(userId);
                    return b;
                });

        ProductView view = new ProductView();
        view.setProductId(productId);
        behavior.getViewedProducts().add(view);

        return userBehaviorRepository.save(behavior);
    }

    public UserBehavior getByUserId(Long userId) {
        return userBehaviorRepository.findByUserId(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Aucun comportement trouvé pour l'utilisateur : " + userId));
    }
}
