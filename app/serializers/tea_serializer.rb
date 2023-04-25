class TeaSerializer < ActiveModel::Serializer
  attributes :id, :name, :blend, :caffeine_level, :user_id, :category_id
end
