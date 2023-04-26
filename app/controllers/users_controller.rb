class UsersController < ApplicationController
    # GET all users
    def index
        users = User.all
        render json: users
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

    private

    # permit only the parameters that we want to use. prevents users from updating attributes they shouldn't have access to, making it more secure. 
    def user_params
      params.permit(:username, :password, :password_confirmation)
    end
end
