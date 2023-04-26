class ApplicationController < ActionController::API
  include ActionController::Cookies

  # this is for error handling in SignUp 
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  
end
