import * as express from 'express';
import usersRouter from './routes/users.routes';
import teamsRouter from './routes/teams.routes';
import matchesRouter from './routes/matches.routes';
import leaderboardsRouter from './routes/leaderboards.routes';
import 'express-async-errors';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
    this.app.use(usersRouter);
    this.app.use(teamsRouter);
    this.app.use(matchesRouter);
    this.app.use(leaderboardsRouter);

    // MIDDLEWARE DE ERRO - testando
    this.app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
      const { name, message, details } = err as any;
      console.log(`name: ${name}`);

      // switch (name) {
      //   case 'ValidationError':
      //     res.status(400).json({ message: details[0].message });
      //     break;
      //   case 'NotFoundError':
      //     res.status(404).json({ message });
      //     break;
      //   case 'ConflictError':
      //     res.status(409).json({ message });
      //     break;
      //   default:
      //     console.error(err);
      //     res.sendStatus(500);
      // }

      next();
    });
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
