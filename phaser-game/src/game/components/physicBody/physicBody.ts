import { Entity, IComponent } from "@phaserGame/utils"

export class PhysicBody implements IComponent {
    public Entity!: Entity
    public Matter!: Phaser.Physics.Matter.MatterPhysics
    public Body: MatterJS.BodyType | undefined

    private _bodies = new Phaser.Structs.Map<string, MatterJS.BodyType>([])

    public Awake(): void {
        this.Matter = this.Entity.Scene.matter
    }

    public Update(deltaTime: number): void {
       
    }

    public AddCollisionRectangle(name: string, x: number, y: number, w: number, h: number, options?: MatterJS.IChamferableBodyDefinition): void {
        var body = this.Matter.bodies.rectangle(x, y, w, h, options)
        this._bodies.set(name, body)
        this.UpdateBody()
    }

    public AddCollisionCircle(name: string, x: number, y: number, radius: number, options?: MatterJS.IChamferableBodyDefinition): void {
        var body = this.Matter.bodies.circle(x, y, radius, options)
        this._bodies.set(name, body)
        this.UpdateBody()
    }

    private UpdateBody(): void {
        if(this.Body) this.Matter.world.remove(this.Body)

        this.Body = this.Matter.body.create({
            parts: this._bodies.values()
        })

        this.Matter.world.add(this.Body)
        
        this.CenterBody()
    }

    private CenterBody(): void {
        var mainBody = this._bodies.values()[0];
        var body = this.Body!;

        var offset = {
            x: body.position.x - mainBody.position.x,
            y: body.position.y - mainBody.position.y
        }

        body.position.x -= offset.x
        body.positionPrev.x -= offset.x
        body.position.y -= offset.y
        body.positionPrev.y -= offset.y
    }

    public SetVelocity(velx: number, vely: number): void {
        this.Matter.body.setVelocity(this.Body!, {x: velx, y: vely})
    }

}