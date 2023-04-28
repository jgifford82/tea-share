class ApplicationController < ActionController::API
  include ActionController::Cookies

  # this is for error handling in SignUp 
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

  # checks that users are logged in (authorized) before an action
  before_action :authorize

  # users must be logged in otherwise they'll get the unauthorized message
  def authorize
    return render json: { error: "Not Authorized" }, status: :unauthorized unless session.include? :user_id
  end

  private
  
  # this is for error handling in SignUp 
  def render_unprocessable_entity_response(exception)
    render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
  end
end
