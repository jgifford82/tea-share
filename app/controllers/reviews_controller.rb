class ReviewsController < ApplicationController
    # GET all reviews
    def index
        review = Review.all
        render json: review
    end
end
