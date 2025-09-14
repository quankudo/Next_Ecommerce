'use client'
import SectionHeading from '@/components/admin/SectionHeading'
import React, { useState } from 'react'
import { Blog } from '@/types/blog'

const Page = () => {
  const [formData, setFormData] = useState<Partial<Blog>>({
    title: '',
    category: '',
    author: '',
    status: 'Draft',
    publishedAt: new Date().toISOString(),
    views: 0,
    desc: ''
  })

  const [imageFiles, setImageFiles] = useState<File[]>([]) // lưu file thật
  const [imageLinks, setImageLinks] = useState<string[]>([]) // lưu link ảnh

  // Upload file
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    setImageFiles(prev => [...prev, ...Array.from(files)])
  }

  // Nhập link ảnh
  const handleAddImageLink = (link: string) => {
    if (!link) return
    setImageLinks(prev => [...prev, link])
  }

  // Xoá ảnh file
  const handleRemoveFile = (index: number) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index))
  }

  // Xoá ảnh link
  const handleRemoveLink = (index: number) => {
    setImageLinks(prev => prev.filter((_, i) => i !== index))
  }

  const handleChange = (field: keyof Blog, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const data = new FormData()
    data.append('title', formData.title || '')
    data.append('category', formData.category || '')
    data.append('author', formData.author || '')
    data.append('status', formData.status || 'Draft')
    data.append('desc', formData.desc || '')

    // Gửi file
    imageFiles.forEach(file => {
      data.append('files', file)
    })

    // Gửi link ảnh
    imageLinks.forEach(link => {
      data.append('imageLinks', link)
    })

    console.log('FormData chuẩn bị gửi:', {
      ...formData,
      files: imageFiles.map(f => f.name),
      links: imageLinks
    })

    // TODO: gọi API backend, ví dụ:
    // const res = await fetch("http://localhost:8080/api/blogs", { method: "POST", body: data });
  }

  return (
    <div>
      <SectionHeading
        text="Tạo bài đăng"
        links={[{ href: '/admin/blogs', label: 'Quản lý bài đăng' }]}
      />

      <div className="mt-4 p-6 bg-white rounded-lg shadow">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Tiêu đề */}
          <div>
            <label className="block font-medium mb-1">Tiêu đề</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              placeholder="Nhập tiêu đề bài đăng"
              value={formData.title}
              onChange={e => handleChange('title', e.target.value)}
            />
          </div>

          {/* Danh mục */}
          <div>
            <label className="block font-medium mb-1">Danh mục</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={formData.category}
              onChange={e => handleChange('category', e.target.value)}
            >
              <option value="">-- Chọn danh mục --</option>
              <option value="sofa">Sofa</option>
              <option value="ban">Bàn</option>
              <option value="ghe">Ghế</option>
              <option value="den">Đèn</option>
            </select>
          </div>

          {/* Tác giả */}
          <div>
            <label className="block font-medium mb-1">Tác giả</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              placeholder="Tên tác giả"
              value={formData.author}
              onChange={e => handleChange('author', e.target.value)}
            />
          </div>

          {/* Upload ảnh */}
          <div>
            <label className="block font-medium mb-1">Ảnh minh họa</label>

            {/* Upload file */}
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
                         file:rounded-full file:border-0
                         file:text-sm file:font-semibold
                         file:bg-blue-50 file:text-blue-700
                         hover:file:bg-blue-100"
            />

            {/* Nhập link ảnh */}
            <div className="flex mt-3 gap-2">
              <input
                type="text"
                placeholder="Nhập link ảnh"
                className="flex-1 border rounded px-3 py-2"
                id="imageLink"
              />
              <button
                type="button"
                onClick={() => {
                  const input = document.getElementById('imageLink') as HTMLInputElement
                  if (input.value) {
                    handleAddImageLink(input.value)
                    input.value = ''
                  }
                }}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Thêm
              </button>
            </div>

            {/* Preview ảnh file */}
            {imageFiles.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-3">
                {imageFiles.map((file, idx) => (
                  <div key={idx} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`file-${idx}`}
                      className="w-32 h-32 object-cover rounded border shadow"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(idx)}
                      className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Preview ảnh link */}
            {imageLinks.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-3">
                {imageLinks.map((link, idx) => (
                  <div key={idx} className="relative">
                    <img
                      src={link}
                      alt={`link-${idx}`}
                      className="w-32 h-32 object-cover rounded border shadow"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveLink(idx)}
                      className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Nội dung */}
          <div>
            <label className="block font-medium mb-1">Nội dung</label>
            <textarea
              rows={6}
              className="w-full border rounded px-3 py-2"
              placeholder="Nhập nội dung bài đăng..."
              value={formData.desc}
              onChange={e => handleChange('desc', e.target.value)}
            />
          </div>

          {/* Trạng thái */}
          <div className="flex items-center gap-3">
            <label className="font-medium">Xuất bản</label>
            <input
              type="checkbox"
              checked={formData.status === 'Published'}
              onChange={e => handleChange('status', e.target.checked ? 'Published' : 'Draft')}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-4">
            <button className='px-5 py-2 text-gray-700 rounded bg-gray-200 hover:bg-gray-300'>Hủy</button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Tạo bài đăng
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Page