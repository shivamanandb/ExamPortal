package com.exam.examserver.service;

import java.util.Set;

import com.exam.examserver.models.exam.Category;


public interface CategoryService {
    
    public Category addCategory(Category Category);

    public Category updateCategory(Category category);

    public Set<Category> getCategories();

    public Category getCategory(Long categoryId);

    public void deleteCategory(Long categoryId);


}
