from fastapi import FastAPI, Request
import uvicorn

app = FastAPI()


@app.post("/api/unipile/callback")
async def unipile_callback(request: Request):
    data = await request.json()

    print("\n==============================")
    print("UNIPILE CALLBACK")
    print("==============================")
    print(data)
    print("==============================\n")

    return {"status": "received"}


if __name__ == "__main__":
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=8000
    )