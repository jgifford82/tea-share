class CategoriesController < ApplicationController
    # GET all categories
    def index
        categories = Category.all
        render json: categories
    end
end
