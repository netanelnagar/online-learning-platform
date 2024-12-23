import { config } from "dotenv";
config({ path: ".env" });
import express from "express";
import cors from "cors";
import { catchAllErrors } from "./middlewares/catchAllErrors";
import { getLogger } from "./utils/winston-logger";
import figlet from "figlet";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { connectToMongo } from "./utils/dal";
import reviewRouter from "./routes/review-route";
import courseRouter from "./routes/course-route";
import studentRouter from "./routes/student-route";
import teacherRouter from "./routes/teacher-route";
import cookieParser from "cookie-parser";
import adminRouter from "./routes/admin-route";
import { sendRes } from "./utils/general-functions";


const log = getLogger("app");

log.info(
    `running in a ${process.env.MODE?.toUpperCase()} environment\n` +
    figlet.textSync(`${process.env.MODE?.toUpperCase()}`, {
        font: "Bulbhead"
    })
)


connectToMongo();

const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 1 minutes).
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    // store: ... , // Redis, Memcached, etc. See below.
})



const app = express();

app.use(limiter)

app.use(helmet({ crossOriginResourcePolicy: false, }));

app.use(express.json());

app.use(cors());

app.use(cookieParser());

app.use('/api/reviews', reviewRouter);
app.use('/api/courses', courseRouter);
app.use('/api/students', studentRouter);
app.use('/api/teachers', teacherRouter);
app.use('/api/admin', adminRouter);


app.use('*', (req, res, next) => {
    sendRes(res, 404, "failed", "Page not found");
});

app.use(catchAllErrors);


const port = process.env.PORT || 3002;
app.listen(port, async () => {
    log.info(`app listening on port ${port}`)
});

