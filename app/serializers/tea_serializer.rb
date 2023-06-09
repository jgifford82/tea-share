class TeaSerializer < ActiveModel::Serializer
  attributes :id, :name, :blend, :caffeine_level, :user_id, :category_id

  # access the reviews for each tea
  has_many :reviews

  # access the tea category
  has_one :category
end
