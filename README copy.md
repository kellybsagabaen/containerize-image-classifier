# 🧠 AI Image Classifier with CNN

A modern, browser-based image classification application built with React, TypeScript, and Hugging Face Transformers. Features real-time image classification using state-of-the-art convolutional neural networks.

![AI Image Classifier](https://via.placeholder.com/800x400/3b82f6/ffffff?text=AI+Image+Classifier)

## ✨ Features

- **🚀 Real-time Classification**: Instant image recognition using pre-trained CNN models
- **🎯 Multiple AI Models**: Switch between MobileNetV4 and ResNet50 architectures
- **💻 Browser-based ML**: No server required - runs entirely in the browser using WebGPU
- **🎨 Modern UI**: Beautiful, responsive design with neural network-inspired theming
- **📊 Confidence Scores**: Detailed probability scores for top 5 predictions
- **🌙 Dark Mode**: Full dark/light theme support
- **⚡ Fast Performance**: Optimized for speed with WebGPU acceleration
- **📱 Mobile Friendly**: Responsive design works on all devices

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **ML Framework**: Hugging Face Transformers.js
- **UI Components**: shadcn/ui with Radix UI primitives
- **Build Tool**: Vite
- **Deployment**: Docker with Nginx

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Modern browser with WebGPU support (Chrome 113+, Firefox 110+)

### Local Development

```bash
# Clone the repository
git clone <repository-url>
cd ai-image-classifier

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:8080](http://localhost:8080) in your browser.

### 🐳 Docker Deployment

#### Option 1: Using Docker Compose (Recommended)

```bash
# Build and run with docker-compose
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the application
docker-compose down
```

#### Option 2: Using Docker directly

```bash
# Build the image
docker build -t ai-image-classifier .

# Run the container
docker run -d \
  --name ai-classifier \
  -p 8080:80 \
  --restart unless-stopped \
  ai-image-classifier

# View logs
docker logs -f ai-classifier
```

The application will be available at [http://localhost:8080](http://localhost:8080)

## 🧠 Supported Models

### MobileNetV4 (Default)
- **Speed**: ⚡ Very Fast
- **Accuracy**: 🎯 Good
- **Use Case**: Real-time applications, mobile devices
- **Model**: `onnx-community/mobilenetv4_conv_small.e2400_r224_in1k`

### ResNet50
- **Speed**: ⚡ Fast
- **Accuracy**: 🎯 High
- **Use Case**: High accuracy requirements
- **Model**: `microsoft/resnet-50`

## 📋 Usage

1. **Select AI Model**: Choose between MobileNetV4 (faster) or ResNet50 (more accurate)
2. **Upload Image**: Click "Upload Image" and select a JPEG, PNG, or WebP file (max 10MB)
3. **Classify**: Click "Classify Image" to run the AI analysis
4. **View Results**: See the top 5 predictions with confidence scores

### Supported Image Formats
- JPEG/JPG
- PNG
- WebP
- Maximum file size: 10MB

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for local development:

```env
# Optional: Enable additional logging
VITE_DEBUG=true

# Optional: Set model cache location
VITE_MODEL_CACHE_PATH=/tmp/transformers-cache
```

### Model Configuration

Edit `src/components/ImageClassifier.tsx` to add more models:

```typescript
const MODELS: ModelConfig[] = [
  {
    name: "Your Model",
    description: "Model description",
    modelId: "huggingface-model-id",
    icon: <YourIcon className="h-4 w-4" />
  },
  // ... existing models
];
```

## 🏗️ Architecture

```
src/
├── components/
│   ├── ui/              # Reusable UI components (shadcn/ui)
│   └── ImageClassifier.tsx  # Main classifier component
├── pages/
│   └── Index.tsx        # Main page
├── lib/
│   └── utils.ts         # Utility functions
└── index.css           # Global styles and design tokens
```

### Key Technologies

- **Hugging Face Transformers.js**: Browser-based machine learning
- **WebGPU**: Hardware-accelerated ML inference
- **React Query**: State management and caching
- **Tailwind CSS**: Utility-first styling
- **Vite**: Fast build tool and dev server

## 📊 Performance

### Model Loading Times
- **MobileNetV4**: ~2-5 seconds (first load)
- **ResNet50**: ~3-8 seconds (first load)
- **Subsequent loads**: <1 second (cached)

### Browser Requirements
- **WebGPU Support**: Chrome 113+, Firefox 110+, Safari 16.4+
- **Memory**: Minimum 4GB RAM recommended
- **Network**: Initial model download requires internet connection

## 🔒 Privacy & Security

- **Client-side Processing**: All image analysis happens in your browser
- **No Data Upload**: Images never leave your device
- **No Tracking**: No analytics or user tracking
- **HTTPS Ready**: SSL/TLS configuration included for production

## 🐛 Troubleshooting

### Common Issues

**Model Loading Fails**
```bash
# Check browser console for WebGPU support
navigator.gpu ? "WebGPU supported" : "WebGPU not supported"
```

**Out of Memory**
- Try using MobileNetV4 instead of ResNet50
- Reduce image size before upload
- Close other browser tabs

**Slow Performance**
- Ensure WebGPU is enabled in browser flags
- Try different model (MobileNetV4 is faster)
- Check available system memory

### Browser Compatibility

| Browser | Version | WebGPU | Status |
|---------|---------|---------|---------|
| Chrome | 113+ | ✅ | Full Support |
| Firefox | 110+ | ✅ | Full Support |
| Safari | 16.4+ | ✅ | Full Support |
| Edge | 113+ | ✅ | Full Support |

## Lovable Development

This project was created using [Lovable](https://lovable.dev/projects/2ea8dd31-a0ba-4c2b-b011-4b94c481d392).

### How to edit this code in Lovable

Simply visit the [Lovable Project](https://lovable.dev/projects/2ea8dd31-a0ba-4c2b-b011-4b94c481d392) and start prompting. Changes made via Lovable will be committed automatically to this repo.

### Deploy with Lovable

Simply open [Lovable](https://lovable.dev/projects/2ea8dd31-a0ba-4c2b-b011-4b94c481d392) and click on Share -> Publish.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Hugging Face](https://huggingface.co/) for the amazing Transformers.js library
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) for accessible component primitives

---

Made with ❤️ and 🧠 AI
