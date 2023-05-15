class UsersController < ApplicationController
    # raise: false means that if the authorize filter is not found, Rails will not raise an exception and will simply skip the authorize filter for the index action. Without the raise option, Rails will raise an AbstractController::ActionNotFound exception.
    skip_before_action :authorize, only: [:create, :index], raise: false
    
    # GET all users
    def index
        users = User.all
        render json: users, include: ['teas.category'], status: 200
    end

    # POST new user (sign up)
    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        if user.valid?
            render json: user, status: :created
        else
            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
    end

    # GET user if the user's id is in params, otherwise get the logged in user (the user_id saved in session for auto login)
    # json response includes all associated data for the logged in user (reviews and teas). this allows the logged in user to see all their reviews on My Reviews page without refreshing, even if they just posted a new review
    def show
        if params[:id]
            user = User.find(params[:id])
        else 
            user = User.find_by!(id: session[:user_id])
        end
        render json: user, include: "*", status: 200
        # render json: user, include: ['teas', 'teas.category'], status: 200
        # render json: user, include: ['reviews.teas'], status: 200
    end

    private

    # permit only the parameters that we want to use. prevents users from updating attributes they shouldn't have access to, making it more secure. 
    def user_params
      params.permit(:username, :password, :password_confirmation)
    end
end
