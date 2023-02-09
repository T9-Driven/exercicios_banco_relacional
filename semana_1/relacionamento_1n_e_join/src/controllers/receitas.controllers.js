import { db } from '../database/database.connection.js'

export async function buscarReceitas(req, res) {
  try {
    const receitas = await db.query("SELECT * FROM receitas")

    res.send(receitas.rows)

  } catch (error) {
    res.status(500).send(error.message)
  }
}

export async function buscarReceitaPorId(req, res) {
  const { id } = req.params
  try {
    const receita = await db.query(`
    SELECT receitas.*, categorias.nome AS nome_categoria FROM receitas
    JOIN categorias
    ON receitas.id_categoria = categorias.id
    WHERE receitas.id = $1;
    `, [id])

    res.send(receita.rows[0])
  } catch (error) {
    res.status(500).send(error.message)
  }
}

export async function criarReceita(req, res) {
  const { titulo, preparo, ingredientes, categoriaId } = req.body

  const id_categoria = categoriaId

  try {
    const receita = await db.query(`
    INSERT INTO receitas (titulo, preparo, ingredientes, id_categoria)
    VALUES ($1, $2, $3, $4);`
      , [titulo, preparo, ingredientes, id_categoria])

    console.log(receita)

    res.send(201)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

export async function apagarUmaReceita(req, res) { }

export async function atualizarUmaReceita(req, res) { }
