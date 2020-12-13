class Donation < ActiveRecord::Base
  validates :name, presence: true
  validates :amount, presence: true, numericality: { greater_than: 0 }

  belongs_to :cause
end
