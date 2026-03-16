import { useState } from 'react'
import axios from 'axios'
import './App.css'

const api_url = import.meta.env.VITE_API_PRODUCTS_URL + "/products";

interface ProductPayload {
  name: string
  description: string
  category: string
  color: string
  images: string[]
  price: number
  stock: number
}

interface ProductFormState {
  name: string
  description: string
  category: string
  color: string
  images: string[]
  price: number
  stock: number
}

const initialProduct: ProductFormState = {
  name: '',
  description: '',
  category: '',
  color: '',
  images: [],
  price: 0,
  stock: 0,
}

function App() {
  const [product, setProduct] = useState<ProductFormState>(initialProduct)
  const [output, setOutput] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null)
  const [newImageUrl, setNewImageUrl] = useState('')

  const updateField = <K extends keyof ProductFormState>(
    field: K,
    value: ProductFormState[K]
  ) => {
    setProduct((prev) => ({ ...prev, [field]: value }))
  }

  const addImage = () => {
    const url = newImageUrl.trim()
    if (!url) return
    setProduct((prev) => ({ ...prev, images: [...prev.images, url] }))
    setNewImageUrl('')
  }

  const removeImage = (index: number) => {
    setProduct((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)
    setOutput(null)
    setSubmitSuccess(null)

    const color = product.color.trim().toLowerCase()
    if (!color) {
      setSubmitError('Color is required.')
      return
    }
    if (product.images.length === 0) {
      setSubmitError('At least one image is required.')
      return
    }

    setIsSubmitting(true)
    const payload: ProductPayload = {
      name: product.name,
      description: product.description,
      category: product.category,
      color,
      images: product.images,
      price: Number(product.price) || 0,
      stock: Number(product.stock) || 0,
    }

    const body = JSON.stringify(payload, null, 2)
    setOutput(body)

    try {
      await axios.post(api_url, body, {
        headers: { 'Content-Type': 'application/json' },
      })
      setSubmitSuccess('Product submitted successfully.')
      setProduct(initialProduct)
      setNewImageUrl('')
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : String(error))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="app">
      <h1>Add product</h1>
      <form onSubmit={handleSubmit} className="form" style={{ paddingBottom: 30 }}>
        <label>
          Name
          <input
            type="text"
            value={product.name}
            onChange={(e) => updateField('name', e.target.value)}
            required
          />
        </label>
        <label>
          Description
          <input
            type="text"
            value={product.description}
            onChange={(e) => updateField('description', e.target.value)}
            required
          />
        </label>
        <label>
          Category
          <input
            type="text"
            value={product.category}
            onChange={(e) => updateField('category', e.target.value)}
            required
          />
        </label>

        <label>
          Color
          <input
            type="text"
            placeholder="e.g. black"
            value={product.color}
            onChange={(e) => updateField('color', e.target.value)}
            required
          />
        </label>

        <fieldset className="colors-field">
          <legend>Images (at least one required)</legend>
          <ul className="image-list">
            {product.images.map((url, i) => (
              <li key={i}>
                <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
                <button type="button" onClick={() => removeImage(i)} className="btn btn-remove-small">
                  ×
                </button>
              </li>
            ))}
          </ul>
          <div className="add-image-row">
            <input
              type="text"
              placeholder="Image URL"
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
            />
            <button type="button" onClick={addImage} className="btn btn-add-small">
              + Image
            </button>
          </div>
        </fieldset>

        <label>
          Price
          <input
            type="number"
            step="0.01"
            min="0"
            value={product.price || ''}
            onChange={(e) =>
              updateField('price', e.target.value === '' ? 0 : Number(e.target.value))
            }
            required
          />
        </label>
        <label>
          Stock
          <input
            type="number"
            min="0"
            value={product.stock || ''}
            onChange={(e) =>
              updateField('stock', e.target.value === '' ? 0 : Number(e.target.value))
            }
            required
          />
        </label>

        <button type="submit" className="btn btn-submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      {submitError && (
        <section className="">
          <h2>Submit error</h2>
          <pre>{submitError}</pre>
        </section>
      )}

      {output && (
        <section className="">
          <h2>Result</h2>
          <pre>{output}</pre>
        </section>
      )}

      {submitSuccess && (
        <section className="">
          <h2>Success</h2>
          <p>{submitSuccess}</p>
        </section>
      )}
    </main>
  )
}

export default App
