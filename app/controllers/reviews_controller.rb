class ReviewsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

    # GET reviews for a specific tea if the matching tea id is found, otherwise show error
    def index
        if params[:tea_id]
            tea = Tea.find(params[:tea_id])
            reviews = tea.reviews
        else 
            render json: render_not_found_response
        end
        render json: reviews
    end

    # POST 1 new review per tea if a user is logged in
    # Find tea by id in params & build a new review for that tea if a review by the current user doesnt already exist for that tea  
    # Set the user for that review to the currently logged in user found in the session
    # Save the review & return it as a response
    def create
        tea = Tea.find(params[:tea_id])
        if tea.reviews.where(user_id: session[:user_id]).exists?
          render json: { error: "You can only create one review per tea" }, status: :unprocessable_entity
        else
          review = tea.reviews.build(review_params)
          review.user = User.find(session[:user_id])
          if review.save
            render json: review, status: :created
          else
            render json: { errors: review.errors.full_messages }, status: :unprocessable_entity
          end
        end
      end

private

    def review_params
        params.require(:review).permit(:comment, :rating)
    end
end
