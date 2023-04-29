class TeasController < ApplicationController
    skip_before_action :authorize, only: [:index]

    #including reviews & reviews.user in #index & #show allows access to deeply nested user data. without it, ActiveModel Serializer only nests associations 1 level deep. this also limits the user attributes to those in user serializer.

    # GET all teas alphabetically by title regardless of capitalization
    def index
        tea = Tea.order('lower(name)').all
        render json: tea, include: ['reviews', 'reviews.user']
    end
end
