class ReviewSerializer < ActiveModel::Serializer
  # ActiveModel::Serializer gem enables customization of JSON to be rendered without sacrificing Rails principles of "convention over configuration" and separation of concerns.
  # list of attributes that we want to be included in JSON rendered by controller methods
  attributes :id, :comment, :rating, :user_id, :tea_id, :tea

  #belongs_to along with user attribute above returns user data in json. access username associated with each review.
  belongs_to :user

  # when a new review is posted, the json response includes the new review's associated tea name. that way, it's available to display in the MyReviews page without having to refresh the page.
  belongs_to :tea
  # , except: [:created_at, :updated_at]
end
