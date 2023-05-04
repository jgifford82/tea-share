class ReviewSerializer < ActiveModel::Serializer
  # ActiveModel::Serializer gem enables customization of JSON to be rendered without sacrificing Rails principles of "convention over configuration" and separation of concerns.
  # list of attributes that we want to be included in JSON rendered by controller methods
  attributes :id, :comment, :rating, :user_id, :tea_id

  #belongs_to along with user attribute above returns user data in json. access username associated with each review.
  belongs_to :user
end
