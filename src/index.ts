import express from 'express';
import cors from 'cors';
import { router as productsRouter } from './routes/prducts';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/hello', (req, res) => res.send('hello back'));

app.use('/api/products', productsRouter);

app.set('port', process.env.PORT || 8000);

app.listen(app.get('port'), () => {
  console.log(' App is running at http://localhost:%d in %s mode', app.get('port'), app.get('env'));
  console.log(' Press CTRL-C to stop\n');
});
