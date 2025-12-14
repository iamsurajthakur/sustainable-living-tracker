import React, { useState } from 'react'
import { Plus, Edit2, Trash2, Calendar, Activity } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const LogActivities = () => {
  const [activities, setActivities] = useState([''])

  const [formData, setFormData] = useState({
    category: 'Transport',
    action: '',
    quantity: '',
    unit: 'km',
    date: new Date().toISOString().split('T')[0],
    note: '',
  })

  const [editingId, setEditingId] = useState(null)
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  )
  const [showSuccess, setShowSuccess] = useState(false)

  const categoryIcons = {
    Transport: '🚶',
    Energy: '💡',
    Water: '💧',
    Waste: '♻️',
    Lifestyle: '🌱',
  }

  const actionsByCategory = {
    Transport: [
      'Walked',
      'Cycled',
      'Used public transit',
      'Carpooled',
      'Electric vehicle',
    ],
    Energy: [
      'Used LED lights',
      'Solar power',
      'Turned off devices',
      'Natural lighting',
    ],
    Water: [
      'Shorter shower',
      'Reused water',
      'Rainwater collection',
      'Fixed leak',
    ],
    Waste: ['Recycled', 'Composted', 'Reused items', 'Zero waste shopping'],
    Lifestyle: [
      'Plant-based meal',
      'Local products',
      'Repaired item',
      'Donated',
    ],
  }

  const unitsByCategory = {
    Transport: ['km', 'miles'],
    Energy: ['kWh', 'hours'],
    Water: ['liters', 'gallons'],
    Waste: ['items', 'kg'],
    Lifestyle: ['items', 'hours'],
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value }

      if (field === 'category') {
        updated.unit = unitsByCategory[value][0]
        updated.action = ''
      }

      return updated
    })
  }

  const handleSubmit = () => {
    if (!formData.action || !formData.quantity) {
      return
    }

    const currentTime = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })

    if (editingId) {
      setActivities((prev) =>
        prev.map((activity) =>
          activity.id === editingId
            ? { ...formData, id: editingId, time: activity.time }
            : activity
        )
      )
      setEditingId(null)
    } else {
      const newActivity = {
        ...formData,
        id: Date.now(),
        time: currentTime,
      }
      setActivities((prev) => [newActivity, ...prev])
    }

    setFormData({
      category: 'Transport',
      action: '',
      quantity: '',
      unit: 'km',
      date: new Date().toISOString().split('T')[0],
      note: '',
    })

    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleEdit = (activity) => {
    setFormData({
      category: activity.category,
      action: activity.action,
      quantity: activity.quantity,
      unit: activity.unit,
      date: activity.date,
      note: activity.note,
    })
    setEditingId(activity.id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = (id) => {
    setActivities((prev) => prev.filter((activity) => activity.id !== id))
  }

  const todaysActivities = activities.filter((a) => a.date === selectedDate)
  const co2Saved = (todaysActivities.length * 2.5).toFixed(1)
  const streak = 7

  return (
    <div className="min-h-screen bg-[#0a0f0d] text-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Log Activity</h1>
            <p className="text-gray-400">
              Track your daily sustainable actions
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-[#1a2820] border border-[#2d3d34] rounded-lg pl-10 pr-4 py-2 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 bg-emerald-950/50 border border-emerald-700 rounded-lg p-4 text-emerald-300">
            ✓ Activity {editingId ? 'updated' : 'logged'} successfully!
          </div>
        )}

        {/* Quick Log Form */}
        <div className="bg-[#1a2820] border border-[#2d3d34] rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-500" />
            {editingId ? 'Edit Activity' : 'Quick Log Form'}
          </h2>

          <div>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              {/* Activity Type */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Activity Type *
                </label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => {
                    handleInputChange('category', value)
                    handleInputChange('action', '')
                  }}
                >
                  <SelectTrigger className="w-full cursor-pointer bg-[#0f1712] border border-[#2d3d34] rounded-lg px-4 py-2.5 text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                    <SelectValue placeholder="Select action..." />
                  </SelectTrigger>

                  <SelectContent className="bg-[#0a0f0d]">
                    {Object.keys(categoryIcons).map((cat) => (
                      <SelectItem
                        key={cat}
                        value={cat}
                        className="cursor-pointer hover:bg-[#28322c]"
                      >
                        {categoryIcons[cat]} {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Action */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Action *
                </label>

                <Select
                  value={formData.action}
                  onValueChange={(value) => handleInputChange('action', value)}
                >
                  <SelectTrigger className="w-full cursor-pointer bg-[#0f1712] border border-[#2d3d34] rounded-lg px-4 py-2.5 text-gray-200 focus:ring-2 focus:ring-emerald-500">
                    <SelectValue placeholder="Select action..." />
                  </SelectTrigger>

                  <SelectContent className="bg-[#0a0f0d]">
                    {actionsByCategory[formData.category]?.map((action) => (
                      <SelectItem
                        key={action}
                        value={action}
                        className="cursor-pointer hover:bg-[#28322c]"
                      >
                        {action}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Quantity *
                </label>
                <input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) =>
                    handleInputChange('quantity', e.target.value)
                  }
                  min="0"
                  step="0.1"
                  className="w-full bg-[#0f1712] border border-[#2d3d34] rounded-lg px-4 py-2.5 text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="0"
                />
              </div>

              {/* Unit */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Unit *
                </label>
                <select
                  value={formData.unit}
                  onChange={(e) => handleInputChange('unit', e.target.value)}
                  className="w-full bg-[#0f1712] border border-[#2d3d34] rounded-lg px-4 py-2.5 text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {unitsByCategory[formData.category].map((unit) => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Date *
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className="w-full bg-[#0f1712] border border-[#2d3d34] rounded-lg px-4 py-2.5 text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Note */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Note (Optional)
                </label>
                <input
                  type="text"
                  value={formData.note}
                  onChange={(e) => handleInputChange('note', e.target.value)}
                  maxLength="100"
                  className="w-full bg-[#0f1712] border border-[#2d3d34] rounded-lg px-4 py-2.5 text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Add a note..."
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSubmit}
                disabled={!formData.action || !formData.quantity}
                className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-colors"
              >
                <Plus className="w-4 h-4" />
                {editingId ? 'Update Activity' : 'Add Activity'}
              </button>
              {editingId && (
                <button
                  onClick={() => {
                    setEditingId(null)
                    setFormData({
                      category: 'Transport',
                      action: '',
                      quantity: '',
                      unit: 'km',
                      date: new Date().toISOString().split('T')[0],
                      note: '',
                    })
                  }}
                  className="bg-[#2d3d34] hover:bg-[#3d4d44] text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Today's Logged Activities */}
          <div className="lg:col-span-2">
            <div className="bg-[#1a2820] border border-[#2d3d34] rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">
                Today's Activities ({todaysActivities.length})
              </h2>

              {todaysActivities.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Activity className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No activities logged yet today</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {todaysActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="bg-[#0f1712] border border-[#2d3d34] rounded-lg p-4 flex items-center justify-between hover:border-emerald-700/50 transition-colors"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <span className="text-2xl">
                          {categoryIcons[activity.category]}
                        </span>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium text-emerald-400">
                              {activity.category}
                            </span>
                            <span className="text-gray-600">|</span>
                            <span className="text-white font-medium">
                              {activity.action}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-gray-400">
                            <span className="font-semibold text-gray-300">
                              {activity.quantity} {activity.unit}
                            </span>
                            <span className="text-gray-600">•</span>
                            <span>{activity.time}</span>
                            {activity.note && (
                              <>
                                <span className="text-gray-600">•</span>
                                <span className="italic">{activity.note}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(activity)}
                          className="p-2 text-gray-400 hover:text-emerald-400 hover:bg-[#1a2820] rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(activity.id)}
                          className="p-2 text-gray-400 hover:text-red-400 hover:bg-[#1a2820] rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Daily Summary */}
          <div>
            <div className="bg-[#1a2820] border border-[#2d3d34] rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">
                Daily Summary
              </h2>

              <div className="space-y-4">
                <div className="bg-[#0f1712] border border-[#2d3d34] rounded-lg p-4">
                  <div className="text-gray-400 text-sm mb-1">
                    Activities Logged
                  </div>
                  <div className="text-3xl font-bold text-white">
                    {todaysActivities.length}
                  </div>
                </div>

                <div className="bg-[#0f1712] border border-[#2d3d34] rounded-lg p-4">
                  <div className="text-gray-400 text-sm mb-1">
                    Estimated CO₂ Saved
                  </div>
                  <div className="text-3xl font-bold text-emerald-400">
                    {co2Saved} kg
                  </div>
                </div>

                <div className="bg-[#0f1712] border border-[#2d3d34] rounded-lg p-4">
                  <div className="text-gray-400 text-sm mb-1">
                    Current Streak
                  </div>
                  <div className="text-3xl font-bold text-amber-400">
                    {streak} days
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LogActivities
