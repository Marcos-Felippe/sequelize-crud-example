const User = require('../models/User');
const Tech = require('../models/Tech');

module.exports = {

  async index(req, res) {
    const { user_id } = req.params;

    const user = await User.findByPk(user_id, {
      include: { 
        association: 'techs', attributes: ['name'], 
        through: { 
          attributes: []
        } 
      }
    })

    return res.json(user.techs);
  },

  async store(req, res) {
    const { user_id } = req.params;
    const { name } = req.body;

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    // encontrando uma tech ou adicionando se não existir
    const [ tech ] = await Tech.findOrCreate({
      where: { name }
    });

    // adicionando uma tech ao usuario
    await user.addTech(tech);

    return res.json(tech);
  },

  async delete(req, res) {

    const { user_id } = req.params;
    const { name } = req.body;

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const tech = await Tech.findOne({
      where: { name }
    });

    // removendo a tech do usuario
    await user.removeTech(tech);

    return res.json();
  }
  
};