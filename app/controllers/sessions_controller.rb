class SessionsController < ApplicationController
    # skips authorizing user so they can log in before it looks for authorization
    skip_before_action :authorize, only: [:create]
    
    # POST login unless username or password are invalid
    def create
        user = User.find_by(username: params[:username])
        if user&.authenticate(params[:password])
            session[:user_id] = user.id
            render json: user, status: :created
        else
            render json: { error: "Invalid username or password" }, status: :unauthorized
        end  
    end

    # DELETE logout 
    def destroy
        session.delete :user_id
        head :no_content
    end
end
