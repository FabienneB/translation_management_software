class Translation < ApplicationRecord
  validates :key, presence: true
  validates :language, presence: true
  validates :value, presence: true

  validates_uniqueness_of :key, scope: [:language]
end
