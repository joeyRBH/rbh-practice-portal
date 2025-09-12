import dynamic from 'next/dynamic'

const MindCareEHRPortal = dynamic(() => import('../components/MindCareEHRPortal'), {
  ssr: false,
  loading: () => <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh',
    fontSize: '1.5rem' 
  }}>Loading MindCare Portal...</div>
})

export default function Home() {
  return <MindCareEHRPortal />
}
