class TeasController < ApplicationController
    # GET all teas alphabetically by title regardless of capitalization
    def index
        tea = Tea.all
        render json: tea
    end
end
