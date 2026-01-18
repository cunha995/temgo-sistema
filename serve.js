const { createClient } = require('@supabase/supabase-js');
const express = require('express');

const supabaseUrl = 'https://jceiegwczgnvwehxnabw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpjZWllZ3djemdudndlaHhuYWJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg3NTUxNzUsImV4cCI6MjA4NDMzMTE3NX0.DpZs53_8bf9Dn0uILWEHTLEwIJcWD51tBeyhBlZqdqk';
const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();
app.use(express.json());
app.use(express.static('.'));

// CADASTRAR
app.post('/cadastrar-motorista', async (req, res) => {
    const { nome, placa_carro, modelo_carro } = req.body;
    const { data, error } = await supabase.from('motoristas').insert([{ nome, placa_carro, modelo_carro }]);
    if (error) return res.status(400).json({ erro: error.message });
    res.status(200).json({ mensagem: 'Motorista salvo com sucesso!' });
});

// LISTAR
app.get('/listar-motoristas', async (req, res) => {
    const { data, error } = await supabase.from('motoristas').select('*').order('nome', { ascending: true });
    if (error) return res.status(400).json({ erro: error.message });
    res.status(200).json(data);
});

// EDITAR (NOVO)
app.put('/editar-motorista/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, placa_carro, modelo_carro } = req.body;
    const { error } = await supabase.from('motoristas').update({ nome, placa_carro, modelo_carro }).eq('id', id);
    if (error) return res.status(400).json({ erro: error.message });
    res.status(200).json({ mensagem: 'Dados atualizados com sucesso!' });
});

// EXCLUIR
app.delete('/excluir-motorista/:id', async (req, res) => {
    const { id } = req.params;
    const { error } = await supabase.from('motoristas').delete().eq('id', id);
    if (error) return res.status(400).json({ erro: error.message });
    res.status(200).json({ mensagem: 'Motorista removido!' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor TemGo rodando na porta ${PORT}`);
});