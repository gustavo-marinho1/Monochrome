import { useState } from 'react'
import axios from 'axios'
import './App.css'

interface Product {
  name: string
  description: string
  category: string
  colors: string[]
  imagesByColor: Record<string, string[]>
  price: number
  stock: number
}

const initialProduct: Product = {
  name: '',
  description: '',
  category: '',
  colors: [],
  imagesByColor: {},
  price: 0,
  stock: 0,
}

function App() {
  const [product, setProduct] = useState<Product>(initialProduct)
  const [output, setOutput] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [newColor, setNewColor] = useState('')
  const [newImageUrls, setNewImageUrls] = useState<Record<string, string>>({})

  const updateField = <K extends keyof Product>(
    field: K,
    value: Product[K]
  ) => {
    setProduct((prev) => ({ ...prev, [field]: value }))
  }

  const addColor = () => {
    const color = newColor.trim().toLowerCase()
    if (!color) return
    if (product.colors.includes(color)) {
      alert('Essa cor já foi adicionada.')
      return
    }
    setProduct((prev) => ({
      ...prev,
      colors: [...prev.colors, color],
      imagesByColor: { ...prev.imagesByColor, [color]: [] },
    }))
    setNewColor('')
  }

  const removeColor = (color: string) => {
    setProduct((prev) => {
      const { [color]: _, ...rest } = prev.imagesByColor
      return {
        ...prev,
        colors: prev.colors.filter((c) => c !== color),
        imagesByColor: rest,
      }
    })
  }

  const addImage = (color: string) => {
    const url = (newImageUrls[color] ?? '').trim()
    if (!url) return
    setProduct((prev) => ({
      ...prev,
      imagesByColor: {
        ...prev.imagesByColor,
        [color]: [...(prev.imagesByColor[color] ?? []), url],
      },
    }))
    setNewImageUrls((prev) => ({ ...prev, [color]: '' }))
  }

  const removeImage = (color: string, index: number) => {
    setProduct((prev) => ({
      ...prev,
      imagesByColor: {
        ...prev.imagesByColor,
        [color]: prev.imagesByColor[color].filter((_, i) => i !== index),
      },
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)
    setOutput(null)
    setIsSubmitting(true)
    const payload: Product = {
      ...product,
      price: Number(product.price) || 0,
      stock: Number(product.stock) || 0,
    }

    const body = JSON.stringify(payload)

    try {
      const res = await axios.post('http://localhost:3002/products', body, {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    setIsSubmitting(false)
  }

  return (
    <main className="app">
      <h1>Adicionar produto</h1>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Nome
          <input
            type="text"
            value={product.name}
            onChange={(e) => updateField('name', e.target.value)}
            required
          />
        </label>
        <label>
          Descrição
          <input
            type="text"
            value={product.description}
            onChange={(e) => updateField('description', e.target.value)}
            required
          />
        </label>
        <label>
          Categoria
          <input
            type="text"
            value={product.category}
            onChange={(e) => updateField('category', e.target.value)}
            required
          />
        </label>

        <fieldset className="colors-field">
          <legend>Cores e imagens</legend>
          <div className="add-color-row">
            <input
              type="text"
              placeholder="Nova cor (ex: black)"
              value={newColor}
              onChange={(e) => setNewColor(e.target.value)}
            />
            <button type="button" onClick={addColor} className="btn btn-add">
              + Adicionar cor
            </button>
          </div>
          {product.colors.map((color) => (
            <div key={color} className="color-block">
              <div className="color-header">
                <strong>{color}</strong>
                <button type="button" onClick={() => removeColor(color)} className="btn btn-remove">
                  Remover cor
                </button>
              </div>
              <ul className="image-list">
                {(product.imagesByColor[color] ?? []).map((url, i) => (
                  <li key={`${color}-${i}`}>
                    <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
                    <button type="button" onClick={() => removeImage(color, i)} className="btn btn-remove-small">
                      ×
                    </button>
                  </li>
                ))}
              </ul>
              <div className="add-image-row">
                <input
                  type="text"
                  placeholder="URL da imagem"
                  value={newImageUrls[color] ?? ''}
                  onChange={(e) =>
                    setNewImageUrls((prev) => ({
                      ...prev,
                      [color]: e.target.value,
                    }))
                  }
                />
                <button type="button" onClick={() => addImage(color)} className="btn btn-add-small">
                  + Imagem
                </button>
              </div>
            </div>
          ))}
        </fieldset>

        <label>
          Preço
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
          Estoque
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
          {isSubmitting ? 'Enviando...' : 'Gerar objeto e enviar'}
        </button>
      </form>

      {submitError && (
        <section className="output">
          <h2>Erro ao enviar</h2>
          <pre>{submitError}</pre>
        </section>
      )}

      {output && (
        <section className="output">
          <h2>Resultado</h2>
          <pre>{output}</pre>
        </section>
      )}
    </main>
  )
}

export default App
