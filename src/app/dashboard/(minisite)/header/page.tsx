'use client'

export default function HeaderPage() {
  return (
    <div className="max-w-2xl space-y-8 p-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Header</h1>
        <p className="text-gray-600 mt-1">Customize your profile header</p>
      </div>

      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-3">Profile Photo</h2>
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
          <button className="px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800">
            Upload Photo
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-3">Cover Image</h2>
        <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center">
          <button className="px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800">
            Upload Cover
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">Display Name</label>
        <input
          type="text"
          placeholder="Your name"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">Bio</label>
        <textarea
          rows={4}
          placeholder="Tell your audience about yourself"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  )
}
