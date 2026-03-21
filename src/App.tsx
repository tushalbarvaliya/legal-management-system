import { BrowserRouter, Routes, Route } from "react-router-dom"
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<></>} />

        <Route path="/case" element={<></>} />
        <Route path="/case/:id" element={<></>} />
        <Route path="/case/add" element={<></>} />
        <Route path="/case/edit/:id" element={<></>} />
        <Route path="/case/delete/:id" element={<></>} />

        <Route path="/docs" element={<></>} />
        <Route path="/docs/:id" element={<></>} />
        <Route path="/docs/add" element={<></>} />
        <Route path="/docs/edit/:id" element={<></>} />
        <Route path="/docs/delete/:id" element={<></>} />

        <Route path="/client" element={<></>} />
        <Route path="/client/:id" element={<></>} />
        <Route path="/client/add" element={<></>} />
        <Route path="/client/edit/:id" element={<></>} />
        <Route path="/client/delete/:id" element={<></>} />

        <Route path="/staff" element={<></>} />
        <Route path="/staff/:id" element={<></>} />
        <Route path="/staff/add" element={<></>} />
        <Route path="/staff/edit/:id" element={<></>} />
        <Route path="/staff/delete/:id" element={<></>} />

        <Route path="/session" element={<></>} />
        <Route path="/session/:id" element={<></>} />
        <Route path="/session/add" element={<></>} />
        <Route path="/session/edit/:id" element={<></>} />
        <Route path="/session/delete/:id" element={<></>} />

        <Route path="/task" element={<></>} />
        <Route path="/task/:id" element={<></>} />
        <Route path="/task/add" element={<></>} />
        <Route path="/task/edit/:id" element={<></>} />
        <Route path="/task/delete/:id" element={<></>} />

        <Route path="/invoice" element={<></>} />
        <Route path="/invoice/:id" element={<></>} />
        <Route path="/invoice/add" element={<></>} />
        <Route path="/invoice/edit/:id" element={<></>} />
        <Route path="/invoice/delete/:id" element={<></>} />

        <Route path="/profile" element={<></>} />
        <Route path="/reset-password" element={<></>} />


        <Route path="/privacy-policy" element={<></>} />
        <Route path="/terms-and-conditions" element={<></>} />

        <Route path="/login" element={<></>} />
        <Route path="/signup" element={<></>} />
        <Route path="/forgot-password" element={<></>} />
        
        <Route path="*" element={<> <h1>404</h1> </>} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
