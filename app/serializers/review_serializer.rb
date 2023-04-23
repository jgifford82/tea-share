class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :comment, :rating, :user_id, :tea_id
end
