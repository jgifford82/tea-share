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
end
