class ApplicationController < ActionController::API
  include ActionController::Cookies

  # this is for error handling in SignUp 
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

  # this is for error handling in SignUp 
  def render_unprocessable_entity_response(exception)
    render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
  end
end
