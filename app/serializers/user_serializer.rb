class UserSerializer < ActiveModel::Serializer
  attributes :id, :username

  # access the teas a user has reviewed
  has_many :teas

  # access the reviews a user has posted
  # custom UserReviewSerializer only returns specific attributes in JSON so it's no longer returning unwanted attributes like created_at, updated_at, & password digest
  has_many :reviews
  # , serializer: ReviewSerializer
end
