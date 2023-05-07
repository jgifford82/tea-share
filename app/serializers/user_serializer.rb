class UserSerializer < ActiveModel::Serializer
  attributes :id, :username

  # access the teas a user has reviewed
  has_many :teas
end
