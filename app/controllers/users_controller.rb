class UsersController < ApplicationController
    # GET all users
    def index
        users = User.all
        render json: users
    end
end
