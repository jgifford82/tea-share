class TeasController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    
    skip_before_action :authorize, only: [:index]

    #including category, reviews & reviews.user in #index & #show allows access to deeply nested data. without it, ActiveModel Serializer only nests associations 1 level deep. this also limits the user attributes to those in user serializer.

    # GET 3 teas at a time (for infinite scroll) alphabetically by title regardless of capitalization
    # page parameter is converted to an integer. 
    # page number is used if positive, otherwise, it defaults to 1 to prevent database error "OFFSET must not be negative."
    # offset((page - 1) * per_page) skips the appropriate number of teas based on the current page number and the number of teas per page.
    # limit(per_page) limits the result to the specified number of teas per page.
    def index
        page = params[:page].to_i.positive? ? params[:page].to_i : 1
        per_page = 3
        
        teas = Tea.order('lower(name)').offset((page - 1) * per_page).limit(per_page)
        render json: teas, include: ['category', 'reviews', 'reviews.user']
    end

    # POST a new tea
    # associate the tea with the current user who is creating it by merging the current user's id to the tea_params before saving the new tea
    # use the build method to associate the tea with a category
    # Save tea & return it as a response
    def create
        tea_params_with_user_id = tea_params.merge(user_id: current_user.id)
        tea = Category.find(params[:category_id]).teas.build(tea_params_with_user_id)
        tea.save!
        render json: tea, status: :created
    end


    # GET a specific tea including nested reviews data
    def show
        tea = Tea.find(params[:id])
        render json: tea, include: ['reviews', 'reviews.user']
    end

    private 

    def tea_params
        params.permit(:name, :blend, :caffeine_level, :category_id)
    end

    # find the user id stored in the session hash & save to instance variable so the user can be retrieved from the instance variable instead of querying the database multiple times
    # ||= is "conditional assignment operator" or "double pipe equals" operator. It assigns the value on the right-hand side of the expression to the variable on the left-hand side only if the variable is currently nil or false. 
    # If @current_user has already been assigned a value before, then it will simply return the previously assigned value without executing User.find_by(id: session[:user_id]) again.
    def current_user
        @current_user ||= User.find_by(id: session[:user_id])
    end
end
