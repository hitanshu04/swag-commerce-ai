export default function ProductCard({ product, onAddToCart }: any) {
  return (
    <div className="group relative bg-[#0f0f11] border border-slate-800 rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-all duration-300">
      <div className="h-56 w-full overflow-hidden bg-black flex items-center justify-center p-4">
        <img 
          src={product.image} 
          className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500" 
          alt={product.name}
        />
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-white text-lg">{product.name}</h3>
          <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase ${
            product.stock < 15 ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'
          }`}>
            {product.stock} LEFT
          </span>
        </div>
        <p className="text-slate-500 text-sm line-clamp-2 mb-4 h-10">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-black text-white">${product.price}</span>
          <button 
            onClick={() => onAddToCart(product)}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-sm font-bold transition-colors"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
