package com.cefiishop.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.cefiishop.model.UserBehavior;

@Repository
public interface UserBehaviorRepository extends MongoRepository<UserBehavior, String> {

    Optional<UserBehavior> findByUserId(Integer userId);
}
